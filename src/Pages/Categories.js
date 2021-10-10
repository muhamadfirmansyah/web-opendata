import { useEffect, useState } from "react"
import Header from "../Components/Header"

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {

        const getCategories = async () => {
            const response = await fetch("http://localhost:8000/api/categories", {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('currentUser')).access_token}`,
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json()

            setCategories(data)
        }

        getCategories()

    }, []); // eslint-ignored;

    return (
        <>
            <Header />
            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">

                            <div className="container max-w-4xl mx-auto mb-4 font-bold flex items-center justify-between">
                                <h4 className="text-2xl">Daftar Category</h4>
                                <div>
                                    <button className="bg-purple-800 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-900">Tambah</button>
                                </div>
                            </div>

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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { categories.map(category => (
                                            <tr key={category.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        { category.id }
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                                        </span>
                                                        <span className="relative">
                                                            { category.name }
                                                        </span>
                                                    </span>
                                                </td>
                                            </tr>
                                        )) }
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

export default Categories