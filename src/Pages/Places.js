import { useEffect, useState } from "react"
import Header from "../Components/Header"
import Levels from "./Levels"

const Places = () => {

    const [places, setPlaces] = useState([])
    const [categories, setCategories] = useState([])
    const [areas, setAreas] = useState([])
    const [isCreate, setIsCreate] = useState(false)
    const [form, setForm] = useState({
        name: "",
        category_id: "",
        city_id: "",
        district_id: "",
        latitude: "",
        longitude: ""
    })

    const token = JSON.parse(localStorage.getItem('currentUser')).access_token

    const getPlaces = async () => {
        const response = await fetch("http://localhost:8000/api/places", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        setPlaces(data)
    }

    const getAttributes = async () => {
        const responseCategories = await fetch("http://localhost:8000/api/categories", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const dataCategories = await responseCategories.json()

        setCategories(dataCategories)

        const responseAreas = await fetch("http://localhost:8000/api/areas", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const dataAreas = await responseAreas.json()

        setAreas(dataAreas)
    }

    useEffect(() => {
        getPlaces()
        getAttributes()

    }, []); // eslint-ignored;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8000/api/places", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })

        const data = await response.json()

        if (!data.error) {
            setForm({
                name: "",
                category_id: "",
                city_id: "",
                district_id: "",
                latitude: "",
                longitude: ""
            })

            getPlaces()
            setIsCreate(false)
        }
    }

    return (
        <>
            <Header />
            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">Places</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">

                            <div className="container max-w-4xl mx-auto mb-4 font-bold flex items-center justify-between">
                                <h4 className="text-2xl">Daftar Place</h4>
                                <div>
                                    <button onClick={() => setIsCreate(!isCreate)} className="bg-purple-800 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-900">{!isCreate ? 'Tambah' : 'Tutup'}</button>
                                </div>
                            </div>

                            {isCreate && (
                                <div className="container mx-auto rounded-lg shadow p-4 max-w-4xl mb-4 bg-white">
                                    <form className="container" onSubmit={handleSubmit}>
                                        <div className="space-y-6 bg-white">
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    Name
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <input type="text"
                                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            placeholder="Name"
                                                            value={form.name}
                                                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    Category
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <select className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="category_id"
                                                            value={form.category_id}
                                                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                                            <option value="">
                                                                Select an option
                                                            </option>
                                                            {categories.map(category => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    City
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <select className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="city_id"
                                                            value={form.city_id}
                                                            onChange={(e) => setForm({ ...form, city_id: e.target.value })}>
                                                            <option value="">
                                                                Select an option
                                                            </option>
                                                            {areas.filter(x => x.level_id === 1).map(area => (
                                                                <option key={area.id} value={area.id}>
                                                                    {area.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    District
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <select className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="district_id"
                                                            value={form.district_id}
                                                            onChange={(e) => setForm({ ...form, district_id: e.target.value })}>
                                                            <option value="">
                                                                Select an option
                                                            </option>
                                                            {areas.filter(x => x.level_id === 2).map(area => (
                                                                <option key={area.id} value={area.id}>
                                                                    {area.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    Coordinates
                                                </h2>
                                                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                                                    <div>
                                                        <div className=" relative ">
                                                            <input type="text"
                                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                                placeholder="Latitude"
                                                                value={form.latitude}
                                                                onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className=" relative ">
                                                            <input type="text"
                                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                                placeholder="Longitude"
                                                                value={form.longitude}
                                                                onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                                                <button type="submit"
                                                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="container mx-auto rounded-lg shadow p-4 max-w-4xl bg-white">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                ID
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                Name
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                Category
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                City
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                District
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                Latitude
                                            </th>
                                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
                                                Longitude
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {places.map(place => (
                                            <tr key={place.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.id}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-purple-900 whitespace-no-wrap font-bold">
                                                        {place.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.category.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.city.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.district.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.latitude}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {place.longitude}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Places