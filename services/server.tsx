
import axios from 'axios'
import { IDashboard } from '@/interface/IDashboard'
import { IProducer } from '@/interface/IProducer'
import { ICropPlanted } from '@/interface/ICropPlanted'


export function controller() {
	const controller = new AbortController()
	return controller
}

export function Server() {


	const api = axios.create({
		baseURL: 'http://localhost:3333',
		timeout: 90000,
	
	})

	const requestWrapper: <T>(cb: any) => Promise<T> = async (cb) => {
		try {
			return await cb()
		} catch (error: any) {
		
		}
	}


	const getDashboard = () =>
		requestWrapper<IDashboard>(async () => {
			const { data } = await api.get('/producers/dashboard', )
			return data
		})

	const getCropsPlanted = () =>
			requestWrapper<ICropPlanted[]>(async () => {
				const { data } = await api.get('/crops-planted/all', )
				return data
			})

	const addProducer = (producer: IProducer) =>
			requestWrapper<IProducer>(async () => {
			  try {
				const { data } = await api.post('/producers', producer)
				return data
			  } catch (error:any) {
				if(error?.response){
					const errors = error?.response
					console.log(error, "ERRO")
					return errors
				} else {
					return error
				} 
			 }
	    })

	return {
		getDashboard,
		addProducer,
		getCropsPlanted	
	}
}
