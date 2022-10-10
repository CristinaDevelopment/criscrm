import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SitesRepository } from 'src/sites/sites.repository';
import {
  Pages0Repository,
  Pages1Repository,
  Pages2Repository,
  Pages3Repository,
  Pages4Repository,
} from '../pages/repository/pages.repository';

let a = ['1', '2'];
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly siteRepository: SitesRepository,
    private readonly page0Repository: Pages0Repository,
    private readonly page1Repository: Pages1Repository,
    private readonly page2Repository: Pages2Repository,
    private readonly page3Repository: Pages3Repository,
    private readonly page4Repository: Pages4Repository,
  ) {}

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  //   // console.log('task');
  // }
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleCron1() {
  //   this.logger.debug('Called every 10 seconds');
  //   const pages0 = await this.pageRepository.find({});
  //   // console.log(pages0.map((data) => data._id.toString()));
  // }
  @Cron('0 0 * * *')
  async handleCronDeletePages0() {
    this.logger.debug('Called every 60 seconds');
    const sites = await this.siteRepository.find({});
    const sitesId = sites.map((data) => data._id.toString());
    const pages0 = await this.page0Repository.find({});
    const pages0Id = pages0.map((data) => data._id.toString());
    const pages1 = await this.page1Repository.find({});
    const pages1Id = pages1.map((data) => data._id.toString());

    await this.page0Repository.deleteManyPagesByParentCron(sitesId);
    await this.page1Repository.deleteManyPagesByParentCron(pages0Id);
    await this.page2Repository.deleteManyPagesByParentCron(pages1Id);
    // console.log('sites Deleted');
  }
}
