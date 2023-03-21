import React, { useEffect, useState } from 'react';

import Header from '../../../components/dashboard/deliveryManagement/deliverymangerheader';
import Sidebar from '../../../components/dashboard/Sidebar';
import Footer from '../../../components/dashboard/Footer';
import DeliveryList from '../../../components/dashboard/deliveryManagement/DeliveryList';
import SearchBar from '../../../components/dashboard/deliveryManagement/searchbar';



function DeliverymanagerHomePage() {
    

    const[deliveries,setDeliveries] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchCategory, setSearchCategory] = useState("");
    const [error, setError] = useState(null);
    


        useEffect(() => {
            const handleSearch = () => {
                const fetchDeliveries = async () => {
                    //* If value for search term is entered
    
                    if (searchCategory === "cusName") {
                        const response = await fetch(`/api/orders/search/name/${searchTerm}`);
                        const json = await response.json();
                        if (response.ok) {
                            setDeliveries(json)
                        } else {
                            setError(json.error);
                            console.log(error);
                        }
                    }
                    else if (searchCategory === "address") {
                        const response = await fetch(`api/orders/search/address/${searchTerm}`);
                        const json = await response.json();
                        if (response.ok) {
                            setDeliveries(json)
                        } else {
                            setError(json.error);
                            console.log(error);
                        }
                    }
                };
    
                //* If search term is empty
                const fetchAllDeliveries = async () => {
                    const response = await fetch("/api/orders/deliveryStatus/packaging");
                    const json = await response.json();
    
                    if (response.ok) {
                        setDeliveries(json);
                    } else {
                        setError(json.error);
                        console.log(error);
                    }
                };
    
                if (searchTerm === "") {
                    fetchAllDeliveries();
                } else {
                    fetchDeliveries();
                }
            }
    
            handleSearch();
    
        }, [searchCategory,searchTerm, error]);




      //* Get search term from Search Bar Component
    const getSearchTerm = (data) => {
        setSearchTerm(data)
    }

    //* Get search categpory from Search Bar Component
    const getSearchCategory = (data)=>{
        setSearchCategory(data);
        console.log(data);
    }

    return (
        <div>
            <Header />
            
            <Sidebar />
            <main className="main" id="main">
            
            <div className='row'>

            <SearchBar 
                searchTerm={getSearchTerm}
                searchCategory = {getSearchCategory}
                />
            </div>

            <DeliveryList orders={deliveries}/>
            {/* <iframe width="640" height="480" src="https://charts.mongodb.com/charts-project-0-btwsw/embed/charts?id=63614faa-09bd-408c-822f-a76c64d1ce32&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe width="640" height="480" src="https://charts.mongodb.com/charts-project-0-btwsw/embed/charts?id=63614052-680d-49c0-85ef-9be133ad6fda&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe  width="640" height="480" src="https://charts.mongodb.com/charts-project-0-btwsw/embed/dashboards?id=fb4ab6db-c4a7-425e-8ef3-40c3bdfdba62&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe> */}
</main>
            <Footer />
            <a href="#" 
            className="back-to-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </a>
        </div>
    );   
}

export default DeliverymanagerHomePage;