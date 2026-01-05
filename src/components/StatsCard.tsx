import { IonText } from '@ionic/react';

interface StatsCardProps {
    value: number;
    label: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'medium';
}

const StatsCard: React.FC<StatsCardProps> = ({
    value,
    label,
    color = 'primary'
}) => {
    return (
        <div className="stat-card">
            <IonText color={color}>
                <h2>{value}</h2>
            </IonText>
            <p>{label}</p>
        </div>
    );
};

export default StatsCard;