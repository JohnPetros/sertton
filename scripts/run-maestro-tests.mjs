import { spawn } from "node:child_process"
import { rm } from "node:fs/promises"
import { resolve } from "node:path"

const outputDirectory = resolve("maestro-output")
const screensDirectory = resolve("tests/screens")
const maestroCommand = process.platform === "win32" ? "maestro.cmd" : "maestro"

const cleanOutput = async () => {
  await rm(outputDirectory, { force: true, recursive: true })
}

const runMaestro = () =>
  new Promise((resolveExitCode) => {
    const process = spawn(
      maestroCommand,
      ["test", "--debug-output", outputDirectory, screensDirectory],
      { stdio: "inherit" },
    )

    process.once("error", (error) => {
      console.error(error)
      resolveExitCode(1)
    })
    process.once("close", (exitCode) => resolveExitCode(exitCode ?? 1))
  })

const main = async () => {
  await cleanOutput()
  try {
    process.exitCode = await runMaestro()
  } finally {
    await cleanOutput()
  }
}

await main()
