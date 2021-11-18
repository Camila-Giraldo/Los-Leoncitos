import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'sia_edufree_cycle4',
  connector: 'mongodb',
  url: 'mongodb+srv://LosLeones:siaEdufree2021@clustersiaedufree.rwgun.mongodb.net/test',
  host: '0',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SiaEdufreeCycle4DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sia_edufree_cycle4';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.sia_edufree_cycle4', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
