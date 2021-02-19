import { Inject, Injectable } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import { launch, Page } from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class ScraperService {
  constructor(@Inject('PUPPETEER') private browser: Page) {}

  async openGraphScraper(dto: { url: string }): Promise<any> {
    const success = ogs({
      url: dto.url,
    })
    .then(async(data: any) => {
      const { result } = data;
      if (!result.ogImage) {
        const image = await this.puppet(dto.url);

        return { ...result, previewImage: image };
      }      

      return result; 
    })
    .catch(err => console.log(err, dto.url)); 

    return success;
  }

  async puppet(url: string): Promise<string> {
    await this.browser.goto(url);
    const image = await this.browser.screenshot();

    return Buffer.from(image).toString('base64');
  }
 }
