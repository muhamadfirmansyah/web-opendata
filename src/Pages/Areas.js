import { useEffect, useState } from "react"
import Header from "../Components/Header"

const Areas = () => {

    const [areas, setAreas] = useState([])
    const [levels, setLevels] = useState([])
    const [isCreate, setIsCreate] = useState(false)
    const [form, setForm] = useState({
        name: "",
        level_id: "",
        code: "",
        latitude: "",
        longitude: ""
    })

    const token = JSON.parse(localStorage.getItem('currentUser')).access_token

    const getAreas = async () => {
        const response = await fetch("http://localhost:8000/api/areas", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        setAreas(data)
    }

    const getAttributes = async () => {
        const responseLevels = await fetch("http://localhost:8000/api/levels", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const dataLevels = await responseLevels.json()

        setLevels(dataLevels)
    }

    useEffect(() => {
        getAreas()
        getAttributes()

        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8000/api/areas", {
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
                level_id: "",
                code: "",
                latitude: "",
                longitude: ""
            })

            getAreas()
            setIsCreate(false)
        }
    }

    return (
        <>
            <Header />
            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">Areas</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">

                            <div className="container max-w-4xl mx-auto mb-4 font-bold flex items-center justify-between">
                                <h4 className="text-2xl">Daftar Area</h4>
                                <div>
                                    <button className="bg-purple-800 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-900" onClick={() => setIsCreate(!isCreate)}>{!isCreate ? "Tambah" : "Tutup"}</button>
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
                                                    Level
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <select className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="level_id"
                                                            value={form.level_id}
                                                            onChange={(e) => setForm({ ...form, level_id: e.target.value })}>
                                                            <option value="">
                                                                Select an option
                                                            </option>
                                                            {levels.map(level => (
                                                                <option key={level.id} value={level.id}>
                                                                    {level.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <h2 className="max-w-sm mx-auto md:w-1/3">
                                                    Kode Kemendagri
                                                </h2>
                                                <div className="max-w-sm mx-auto md:w-2/3">
                                                    <div className=" relative ">
                                                        <input type="text"
                                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            placeholder="code"
                                                            value={form.code}
                                                            onChange={(e) => setForm({ ...form, code: e.target.value })} />
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
                                                Level
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
                                        {areas.map(level => (
                                            <tr key={level.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {level.id}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                                        </span>
                                                        <span className="relative">
                                                            {level.name}
                                                        </span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {level.level.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {level.latitude}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {level.longitude}
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

export default Areas