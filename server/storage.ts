import { users, type User, type InsertUser, type Property, type InsertProperty } from "@shared/schema";
import memorystore from "memorystore";
import session from "express-session";

const MemoryStore = memorystore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  sessionStore: session.Store;
  private userId: number;
  private propertyId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.userId = 1;
    this.propertyId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Add some sample properties
    this.seedProperties();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, role: "agent" };
    this.users.set(id, user);
    return user;
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyId++;
    const property: Property = {
      ...insertProperty,
      id,
      createdAt: new Date(),
    };
    this.properties.set(id, property);
    return property;
  }

  private seedProperties() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "Stunning Home in Prime Location",
        description: "Beautiful modern home with premium finishes and amazing views.",
        price: 1250000,
        location: "Beverly Hills, CA",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        features: ["Pool", "Garden", "Smart Home", "Solar Panels"],
        openHouseDate: new Date("2024-04-15"),
      },
      {
        title: "Modern Downtown Loft",
        description: "Spacious loft in the heart of downtown with high ceilings.",
        price: 850000,
        location: "Downtown LA",
        imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
        bedrooms: 2,
        bathrooms: 2,
        area: 1600,
        features: ["High Ceilings", "Floor-to-ceiling Windows", "Gourmet Kitchen"],
        openHouseDate: new Date("2024-04-20"),
      },
    ];

    sampleProperties.forEach((property) => {
      this.createProperty(property);
    });
  }
}

export const storage = new MemStorage();