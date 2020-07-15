import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Campaign } from './campain.model';
import { User } from '../../auth/models/user.model';
const mongoose = require('mongoose');

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  })
  campaign: Campaign;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  affiliate: User;
  @Prop({ required: true })
  eventType: string;
  @Prop({ type: mongoose.Mixed })
  value: any;
  @Prop()
  country: string;
  @Prop()
  ipAddress: string;
  @Prop()
  source: string;
  @Prop({ type: Date, required: true })
  eventDate: Date;
  @Prop({ type: Date, required: true })
  createdAt: Date;
  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
