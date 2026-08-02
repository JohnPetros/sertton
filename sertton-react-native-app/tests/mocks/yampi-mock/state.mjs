import { createFixtures } from "./fixtures.mjs"

let currentState = createState()

function createState() {
  return {
    fixtures: createFixtures(),
    leads: [],
    scenario: "default",
  }
}

export const getState = () => currentState

export const resetState = () => {
  currentState = createState()
  return currentState
}

export const setScenario = (scenario) => {
  currentState.scenario = scenario
  return currentState
}
