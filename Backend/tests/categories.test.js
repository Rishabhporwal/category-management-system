const request = require("supertest");
const app = require("../app");
const Category = require("../models/category");
const sequelize = require("../config/connection");

// Clear the database before each test
beforeEach(async () => {
  await Category.destroy({ truncate: true, cascade: true });
});

// Close the database connection after all tests
afterAll(async () => {
  await sequelize.close();
});

describe("Categories API", () => {
  describe("POST /categories", () => {
    test("should create a new category", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "Test Category" });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test Category");
    });
  });

  describe("GET /categories", () => {
    test("should retrieve all categories", async () => {
      await Category.bulkCreate([
        { name: "Category 1" },
        { name: "Category 2" },
      ]);

      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe("GET /categories/:id", () => {
    test("should retrieve a single category by ID", async () => {
      const category = await Category.create({ name: "Test Category" });

      const response = await request(app).get(`/categories/${category.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test Category");
    });

    test("should return 404 if category is not found", async () => {
      const response = await request(app).get("/categories/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Category not found");
    });
  });

  describe("PUT /categories/:id", () => {
    test("should update a category by ID", async () => {
      const category = await Category.create({ name: "Test Category" });

      const response = await request(app)
        .put(`/categories/${category.id}`)
        .send({ name: "Updated Category" });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated Category");
    });

    test("should return 404 if category is not found", async () => {
      const response = await request(app)
        .put("/categories/999")
        .send({ name: "Updated Category" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Category not found");
    });
  });

  describe("DELETE /categories/:id", () => {
    test("should delete a category by ID", async () => {
      const category = await Category.create({ name: "Test Category" });

      const response = await request(app).delete(`/categories/${category.id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Category deleted");
    });

    test("should return 404 if category is not found", async () => {
      const response = await request(app).delete("/categories/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Category not found");
    });
  });
});
