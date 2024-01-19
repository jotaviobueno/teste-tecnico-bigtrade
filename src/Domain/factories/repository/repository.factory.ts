import mongoose from "mongoose";

export class RepositoryFactory<Entity, CreateDto = void, UpdateDto = void> {
  constructor(public model: mongoose.Model<any>) {}

  create(data: CreateDto): Promise<Entity> {
    return this.model.create<Entity>({ ...data });
  }

  update({
    _id,
    ...data
  }: UpdateDto & { _id?: string | mongoose.Types.ObjectId }) {
    return this.model.updateOne({ _id }, { ...data, updated_at: new Date() });
  }

  softDelete(_id: string | mongoose.Types.ObjectId) {
    return this.model.updateOne(
      { _id },
      { updated_at: new Date(), deleted_at: new Date() }
    );
  }
}
