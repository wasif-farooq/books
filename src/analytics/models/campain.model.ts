import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../auth/models/user.model';
const mongoose = require('mongoose');
@Schema({ timestamps: true })
export class Campaign extends Document {
  @Prop({ required: true })
  campaignName: string;
  @Prop({ required: true })
  campaignType: string;
  @Prop()
  mediaType: string;
  @Prop()
  language: string;
  @Prop()
  size: string;
  @Prop({ required: true })
  destinationUrl: string;
  @Prop()
  htmlCode: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: User;
  @Prop()
  picturePath: string;
  @Prop()
  isDeleted: Boolean;
  @Prop({ type: Date, required: true })
  createdAt: Date;
  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
