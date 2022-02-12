import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react'
import Link from 'next/link';

const CampaignIndex = ({ campaigns }) => {
    const renderCampaigns = () =>{
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link href={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                    ),
                fluid: true
            }
        });
        return <Card.Group items={items} className="margin-top"/>
    }

    return(
            <div>
                <h3>Open Campaigns</h3>
                <Link href="/campaigns/new">
                    <a>
                        <Button 
                            content="Create Campaign"  
                            icon="add circle"  
                            className='margin-top'
                            floated='right'
                            primary
                            />
                    </a>
                </Link>
                { renderCampaigns() }
            </div>
    )
};

export async function getServerSideProps() {
    const campaigns = await factory().methods.getDeployedCampaign().call();
    return { props: { campaigns } };
};

export default CampaignIndex;