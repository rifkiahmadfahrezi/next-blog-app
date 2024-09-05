import axios from 'axios'

const axiosClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})


export const fetcher = async (endpoint : string) => {
   try {
      const req = await axiosClient.get(endpoint)
      return req.data
   } catch (error) {
      console.error(error)
      return error
   }
}

export default axiosClient