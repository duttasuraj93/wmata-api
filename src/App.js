import { useEffect, useState } from 'react';
import Train from './components/Train';
import './App.css';
import { trainColors } from './utils/trainColors';
import TrainColorFilter from './components/TrainColorFilter';
import ServiceTypeFilter from './components/ServiceTypeFilter';
import CarCountFilter from './components/CarCountFilter';
import useInterval from './hooks/useInterval'


const service_types = ['NoPassengers', 'Normal', 'Special', 'Unknown']

function App() {

	const [loading, setLoading] = useState(true)
	const [trains, setTrains] = useState([])
	const [filteredTrains, setFilteredTrains] = useState([])


	const [carCounts, setCarCounts] = useState([])


	const [filterStatus, setFilterStatus] = useState({
		LineCode: null,
		ServiceType: null,
		CarCount: null,
	})

	const getAllTrains = async () => {
		await fetch(`https://api.wmata.com/TrainPositions/TrainPositions?contentType=json`, {
			headers: {
				'api_key': 'a98a07b8e35347548cbc16f06384baff'
			}
		}).then(res => res.json())
			.then(res => {
				setTrains(res.TrainPositions);
				setFilteredTrains(res.TrainPositions)
				setLoading(false);

				let car_count = res.TrainPositions.map(item => item.CarCount)
				car_count = [... new Set(car_count)]
				setCarCounts(car_count)

			}).catch(err => {
				console.log("error" + err);
			})

	}


	useEffect(() => {

		getAllTrains()

	}, [])

	useInterval(() => {
		getAllTrains()
	}, 1000 * 60);


	const getTrainColorFilter = () => {
		let filterColors = []
		for (const [key, value] of Object.entries(trainColors)) {
			filterColors.push(<option key={key} value={key}>{value}</option>)

		}
		return filterColors
	}



	const filterTrains = (type, value) => {

		setFilterStatus(prevState => ({
			...prevState,
			[type]: value === 'all' ? null : value
		}));

		let filtered = trains.filter((item => type === 'LineCode' && value === 'BK' ? item[type] == null : item[type] == value))

		if (filterStatus.CarCount) filtered = filtered.filter(item => value === 'all' ? item : filterStatus.CarCount == item[type])

		if (filterStatus.ServiceType) filtered = filtered.filter(item => filterStatus.ServiceType ? filterStatus.ServiceType : value)

		if (filterStatus.LineCode) filtered = filtered.filter(item => item.LineCode == filterStatus.LineCode ? filterStatus.LineCode : value)

		setFilteredTrains(filtered)

	}

	if (loading) return <div>Loading</div>


	return (
		<div className="App">
			<div className='filter'>
				<CarCountFilter onChange={filterTrains} value={filterStatus.carCounts} options={carCounts} />

				<ServiceTypeFilter onChange={filterTrains} value={filterStatus.ServiceType} options={service_types} />

				<TrainColorFilter onChange={filterTrains} value={filterStatus.LineCode} getColor={getTrainColorFilter} />
			</div>

			<div>
				<div className='trains'>
					{
						filteredTrains.map(item => <Train key={item.TrainId} item={item} />)
					}
				</div>
			</div>
		</div>
	);
}

export default App;
