import { createOrdenIdDto } from '../../application/dto/createOrdenId.dto';

export interface iOrdenRepository {
  createOrdenId(): Promise<any[]>;
}
