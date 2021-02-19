import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { launch } from 'puppeteer';

@Module({
  providers: [
    ScraperService,
    // 브라우저를 서버 실행 시에 미리 실행시켜서 크롤링 속도를 개선한다
    {
      provide: 'PUPPETEER',
      useFactory: async () => {
        const browser = await launch();
        const page = await browser.newPage();

        return page;
      }
    } 
  ],
  controllers: [ScraperController]
})
export class ScraperModule {}
