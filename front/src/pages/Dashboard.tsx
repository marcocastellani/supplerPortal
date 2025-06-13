import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardQuestionnaires from '../components/Dashboard/DashboardQuestionnaires';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {t('dashboard.subtitle', 'Monitor your supplier questionnaires and compliance status')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DashboardQuestionnaires />
            
            {/* Placeholder per futuri widget della dashboard */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Altri Widget Dashboard
              </h2>
              <p className="text-gray-600">
                Qui verranno aggiunti altri componenti della dashboard come statistiche,
                grafici di compliance, notifiche, ecc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
