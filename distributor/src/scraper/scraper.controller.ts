import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ScraperDto } from './scraper.dto';

@Controller('scraper')
export class ScraperController {
    constructor(@Inject('SCRAPER_SERVICE') private client: ClientProxy) {}

    @Post()
    async scraper(@Body() scraperDto: ScraperDto) {
        return await this.client.send('scraper', scraperDto).toPromise();
    }
}
