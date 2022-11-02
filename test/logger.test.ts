import * as T from "@effect/core/io/Effect"
import * as Log from "@core/logger"
import { pipe } from "@tsplus/stdlib/data/Function"
import * as Ex from "@effect/core/io/Exit"
import { provideSomeLayer } from "@effect/core/io/Effect"

describe("Logger", () => { 

  it("should simply log something", async () => {

    const res = await T.unsafeRunPromiseExit(
      pipe(
        Log.info("Hello Andreas!"),
        provideSomeLayer(Log.consoleLogger)
      )     
    )

    expect(Ex.isSuccess(res)).toBeTruthy
  })
})