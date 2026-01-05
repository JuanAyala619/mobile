import { IonAvatar, IonIcon, IonText } from '@ionic/react';
import { person } from 'ionicons/icons';

interface ProfileHeaderProps {
    username: string;
    memberSince?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    username,
    memberSince = 'Enero 2024'
}) => {
    return (
        <div className="profile-header">
            <IonAvatar className="profile-avatar">
                <IonIcon icon={person} size="large" />
            </IonAvatar>
            <h2>{username}</h2>
            <IonText color="medium">
                <p>Miembro desde {memberSince}</p>
            </IonText>
        </div>
    );
};

export default ProfileHeader;