const mockAxios = jest.genMockFromModule('axios')
// this is key to fix the axios.create() undefined error
mockAxios.create = jest.fn(() => mockAxios)
export default mockAxios
