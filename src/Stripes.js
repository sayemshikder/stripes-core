import React from 'react';
import PropTypes from 'prop-types';
import { isVersionCompatible } from './discoverServices';


export const stripesShape = PropTypes.shape({
  logger: PropTypes.shape({
    log: PropTypes.func.isRequired,
  }).isRequired,
  connect: PropTypes.func.isRequired,
  hasPerm: PropTypes.func.isRequired,
  // XXX more
});


class Stripes {
  constructor(properties) {
    Object.assign(this, properties);
  }

  hasPerm(perm) {
    const logger = this.logger;
    if (this.config && this.config.hasAllPerms) {
      logger.log('perm', `assuming perm '${perm}': hasAllPerms is true`);
      return true;
    }
    if (!this.user.perms) {
      logger.log('perm', `not checking perm '${perm}': no user permissions yet`);
      return undefined;
    }
    logger.log('perm', `checking perm '${perm}': `, !!this.user.perms[perm]);
    return this.user.perms[perm] || false;
  }

  hasInterface(name, versionWanted) {
    const logger = this.logger;
    if (!this.discovery || !this.discovery.interfaces) {
      logger.log('interface', `not checking interface '${name}': no discovery yet`);
      return undefined;
    }
    const version = this.discovery.interfaces[name];
    if (!version) {
      logger.log('interface', `interface '${name}' is missing`);
      return undefined;
    }
    if (!versionWanted) {
      logger.log('interface', `interface '${name}' exists`);
      return true;
    }
    const ok = isVersionCompatible(version, versionWanted);
    const cond = ok ? 'is' : 'is not';
    logger.log('interface', `interface '${name}' v${versionWanted} ${cond} compatible with available v${version}`);
    return ok ? version : 0;
  }

  clone(extraProps) {
    return new Stripes(Object.assign({}, this, extraProps));
  }

  extendStripesProps(Module, extraProps = {}) {
    return props => <Module {...props} stripes={this.clone(extraProps)} />;
  }
}

export default Stripes;
