import elementData from '../mockData/element.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const elementService = {
  async getAll() {
    await delay(300)
    return [...elementData]
  },

  async getById(id) {
    await delay(200)
    const element = elementData.find(item => item.id === id)
    return element ? { ...element } : null
  },

  async create(element) {
    await delay(400)
    const newElement = {
      ...element,
      id: Date.now().toString()
    }
    elementData.push(newElement)
    return { ...newElement }
  },

  async update(id, data) {
    await delay(350)
    const index = elementData.findIndex(item => item.id === id)
    if (index !== -1) {
      elementData[index] = { ...elementData[index], ...data }
      return { ...elementData[index] }
    }
    throw new Error('Element not found')
  },

  async delete(id) {
    await delay(300)
    const index = elementData.findIndex(item => item.id === id)
    if (index !== -1) {
      const deleted = elementData.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Element not found')
  }
}