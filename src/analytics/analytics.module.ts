import { Module } from '@nestjs/common';
import { Campaign, CampaignSchema } from './models/campain.model';
import { Event, EventSchema } from './models/event.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './controllers/event/event.controller';
import { CampaignController } from './controllers/campaign/campaign.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [EventController, CampaignController],
})
export class AnalyticsModule {}
