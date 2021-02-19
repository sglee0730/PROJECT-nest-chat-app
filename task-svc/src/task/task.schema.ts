import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);