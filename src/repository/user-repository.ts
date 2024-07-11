import { Op } from "sequelize";
import User from "../models/user";
import { UserProps, UserQueryProps } from "../types";

class UserRepository {
  static async create(data: UserProps) {
    const result = await User.create(data);
    return result.toJSON() as UserProps;
  }
  static async update(data: Partial<UserProps>, id: number) {
    return await User.update(data, { where: { id } });
  }
  static async findByPk(id: number) {
    const result = await User.findByPk(id);
    return result?.toJSON() as UserProps;
  }
  static async findOne(query: Partial<UserProps>) {
    const where = {} as UserProps;
    if (query.id) where.id = query.id;
    if (query.phone) where.phone = query.phone;
    if (query.publicId) where.publicId = query.publicId;
    if (query.isActive) where.isActive = query.isActive;
    if (query.isBanned) where.isBanned = query.isBanned;
    if (query.email) where.email = query.email;
    if (query.isDeleted) where.isDeleted = query.isDeleted;
    if (query.isVerified) where.isVerified = query.isVerified;
    if (query.profileSetup) where.profileSetup = query.profileSetup;
    const result = await User.findOne({ where });
    return result?.toJSON() as UserProps;
  }

  static async findAll(query: UserQueryProps) {
    const limit = parseInt(query.limit || "20");
    const page = parseInt(query.page || "1");
    const totalPages = (count: number) => Math.ceil(count / limit);

    const where = {} as any;
    if (query.isActive) where.isActive = query.isActive;
    if (query.isBanned) where.isBanned = query.isBanned;
    if (query.id) where.id = query.id;
    if (query.isDeleted) where.isDeleted = query.isDeleted;
    if (query.isVerified) where.isVerified = query.isVerified;
    if (query.profileSetup) where.profileSetup = query.profileSetup;
    if (query.phone) where.phone = query.phone;
    if (query.keyword) {
      where[Op.or] = {
        email: { [Op.like]: `%${query.keyword.trim().split("").join("%")}%` },
        lastName: { [Op.like]: `%${query.keyword.trim().split("").join("%")}%` },
        firstName: { [Op.like]: `%${query.keyword.trim().split("").join("%")}%` },
      };
    }
    const response = await User.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
    });
    const count = await User.count({ where });

    return {
      limit: limit,
      page: page,
      totalDocs: count,
      nextPage: page === totalPages(count) ? null : page + 1,
      totalPages: totalPages(count),
      data: response.map((item) => item.toJSON()) as UserProps[],
    };
  }
}

export default UserRepository;
