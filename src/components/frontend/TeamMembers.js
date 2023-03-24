import React from 'react'
import member1 from '../../assets/frontend/img/common/team-member-1.png';
import member2 from '../../assets/frontend/img/common/team-member-2.png';
import member3 from '../../assets/frontend/img/common/team-member-3.png';
import member4 from '../../assets/frontend/img/common/team-member-4.png';
import { TeamMember } from './card/TeamMember';

export const TeamMembers = () => {
  return (
    <div className='team-members py-5'>
        <div className='container'>
            <h6 className='color-1'>TEAM MEMBERS</h6>
            <h1 className='fw-bold mb-0'>Meet Our Best Team</h1>
            {/* <h1 className='color-1'>-------------</h1> */}
            <div className='row mt-5 text-light'>
                <TeamMember image={member1} name='Alizeh Anderson' designation='Senior Chef' />
                <TeamMember image={member2} name='Angelina Doe' designation='Master Chef' />
                <TeamMember image={member3} name='Andre Smith' designation='Professor' />
                <TeamMember image={member4} name='Christina Chi' designation='Psychologist' />
            </div>
        </div>
    </div>
  )
}
