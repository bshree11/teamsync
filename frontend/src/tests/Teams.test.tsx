import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import CreateTeamModal from '../components/features/CreateTeamModal';


describe('CreateTeamModel', ()=>{
    it('shows form with title and inputs', ()=>{
        //render the modal
        render(
            <CreateTeamModal
            onClose={()=>{}}
            onCreated={()=>{}}
            />
        );

        //check title exists
        expect(screen.getByText('Create New Team')).toBeInTheDocument();

        //check inputs exists
        expect(screen.getByText('Create New Team')).toBeInTheDocument();

        //checks inputs exits
        expect(screen.getByPlaceholderText('Enter team name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter team description')).toBeInTheDocument();

        //check buttons exist
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Create Team')).toBeInTheDocument();
    });
});

//Test 2 - Do our API functions exits?

describe('Team Service', ()=>{
    it('exports all required functions', async() =>{
        const teamService = await import('../services/teamService');

        expect(teamService.getTeams).toBeDefined();
        expect(teamService.getTeam).toBeDefined();
        expect(teamService.createTeam).toBeDefined();
        expect(teamService.deleteTeam).toBeDefined();
    });
});