import request from "supertest"
import server from "../server"

import { getFavourites, addFavourite } from "../db"

jest.mock("../db", () => ({
  getFavourites: jest.fn(),
  addFavourite: jest.fn()
}))

describe("/api/favourites/:id", () => {
  test("returns favourite recipe", () => {
    expect.assertions(2)
    getFavourites.mockImplementation(() =>
      Promise.resolve([{ id: 1, recipe_name: "Beef Kebabs" }])
    )
    return request(server)
      .get("/api/favourites/:id")
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(1)
      })
  })
})

describe("/api/favourites", () => {
    test("add fav to database", () => {
       expect.assertions(5)
        addFavourite.mockImplementation(() => Promise.resolve([0]))
        return request(server)
            .post('/api/favourites')
            .send({user_id: 2, recipe_id: 3})
            .then(res => {
                expect(addFavourite).toHaveBeenCalled()
                expect(addFavourite.mock.calls[0][0].user_id).toBe(2)
                expect(addFavourite.mock.calls[0][0].recipe_id).toBe(3)
                expect(res.status).toBe(201)
                expect(res.body.id).toBe(0)
            })
    })
})
