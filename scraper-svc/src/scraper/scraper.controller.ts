import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
    constructor(private scraperService: ScraperService) {}

    @MessagePattern('scraper')
    async openGraphScraper(@Payload() dto: { url: string }) {
        return this.scraperService.openGraphScraper(dto);
    }
}
