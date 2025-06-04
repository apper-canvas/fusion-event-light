import combinationData from '../mockData/combination.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const combinationService = {
  async getAll() {
    await delay(250)
    return [...combinationData]
  },

  async getById(id) {
    await delay(200)
    const combination = combinationData.find(item => item.id === id)
    return combination ? { ...combination } : null
  },

  async create(combination) {
    await delay(400)
    const newCombination = {
      ...combination,
      id: Date.now().toString()
    }
    combinationData.push(newCombination)
    return { ...newCombination }
  },

  async update(id, data) {
    await delay(350)
    const index = combinationData.findIndex(item => item.id === id)
    if (index !== -1) {
      combinationData[index] = { ...combinationData[index], ...data }
      return { ...combinationData[index] }
    }
    throw new Error('Combination not found')
  },

  async delete(id) {
    await delay(300)
    const index = combinationData.findIndex(item => item.id === id)
    if (index !== -1) {
      const deleted = combinationData.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Combination not found')
  }
}