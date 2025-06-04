import playerProgressData from '../mockData/playerProgress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const playerProgressService = {
  async getAll() {
    await delay(300)
    return [...playerProgressData]
  },

  async getById(id) {
    await delay(200)
    const progress = playerProgressData.find(item => item.id === id)
    return progress ? { ...progress } : null
  },

  async create(progress) {
    await delay(400)
    const newProgress = {
      ...progress,
      id: Date.now().toString()
    }
    playerProgressData.push(newProgress)
    return { ...newProgress }
  },

  async update(id, data) {
    await delay(350)
    const index = playerProgressData.findIndex(item => item.id === id)
    if (index !== -1) {
      playerProgressData[index] = { ...playerProgressData[index], ...data }
      return { ...playerProgressData[index] }
    }
    throw new Error('Player progress not found')
  },

  async delete(id) {
    await delay(300)
    const index = playerProgressData.findIndex(item => item.id === id)
    if (index !== -1) {
      const deleted = playerProgressData.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Player progress not found')
  }
}