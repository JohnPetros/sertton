import { readdir, readFile } from "node:fs/promises"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const workspaceDirectory = fileURLToPath(new URL("../", import.meta.url))
const sourceDirectory = join(workspaceDirectory, "src")
const forbiddenPackages = ["@expo/ui", "expo-glass-effect", "expo-symbols"]

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? collectFiles(path) : [path]
    }),
  )

  return files.flat()
}

const sourceFiles = (await collectFiles(sourceDirectory)).filter((file) => /\.(ts|tsx)$/.test(file))
const violations = []

for (const file of sourceFiles) {
  const content = await readFile(file, "utf8")
  const filePath = relative(workspaceDirectory, file).replaceAll("\\", "/")
  const containsForbiddenPackage = forbiddenPackages.some((packageName) =>
    content.includes(packageName),
  )
  const hasDefaultExportOutsideRoute =
    !filePath.startsWith("src/app/") &&
    !filePath.endsWith(".d.ts") &&
    /export\s+default\b/.test(content)
  const hasFunctionJsx = /(?:export\s+)?function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?return\s*\(/.test(
    content,
  )
  const isClientSource =
    filePath.startsWith("src/ui/") ||
    (filePath.startsWith("src/app/") && !filePath.startsWith("src/app/api/"))
  const importsYampi = /from\s+["']@\/rest\/yampi/.test(content)

  if (
    containsForbiddenPackage ||
    hasDefaultExportOutsideRoute ||
    hasFunctionJsx ||
    (isClientSource && importsYampi)
  ) {
    violations.push(filePath)
  }
}

if (violations.length > 0) {
  throw new Error(`Invalid import, export, or JSX declaration in: ${violations.join(", ")}`)
}
