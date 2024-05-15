interface DataElement {
    id: number;
    title: string;
    description: string;
    price:number;
    category: string;
    image: string;
    rating: Rating;
}

interface Rating {
    rate: number;
    count: number;
}