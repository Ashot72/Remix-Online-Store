import { useMatches } from "@remix-run/react";
import CategoryListItem from "./CategoryListItem";

export default function CategoriesList({ categories }) {
    const matches = useMatches()

    const user = matches.find(
        match => match.id === 'routes/__goods'
    ).data

    return (
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map(category => (
                        <tr key={category.id}>
                            <CategoryListItem
                                id={category.id}
                                name={category.name}
                                description={category.description}
                                userId={category.userId}
                                user={user}
                            />
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}