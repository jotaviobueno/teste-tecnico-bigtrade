import mongoose from "mongoose";

export abstract class ServiceContract<K, T = void, J = void> {
  abstract createMany?(dto: T[]): Promise<unknown>;
  abstract create?(dto: T): Promise<K>;
  abstract findById?(id: string | mongoose.Types.ObjectId): Promise<K>;
  abstract findAll?(): Promise<K[]>;
  abstract update?(
    dto: J & { id: string | mongoose.Types.ObjectId }
  ): Promise<K>;
  abstract remove?(id: string | mongoose.Types.ObjectId): Promise<boolean>;
}
