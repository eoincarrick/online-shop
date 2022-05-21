import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import banner from './banner';
import product from './product';
import comment from './comment';
import category from './category';
import views from './views';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([banner, product, comment, category, views]),
});
