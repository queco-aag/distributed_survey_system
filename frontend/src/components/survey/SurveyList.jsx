import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import surveyService from '../../services/surveyService';
import './Survey.css';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const data = await surveyService.getAllSurveys();
      setSurveys(data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load surveys',
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (surveyId) => {
    confirmDialog({
      message: 'Are you sure you want to delete this survey?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await surveyService.deleteSurvey(surveyId);
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Survey deleted successfully',
            life: 3000,
          });
          loadSurveys();
        } catch (error) {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete survey',
            life: 3000,
          });
        }
      },
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-info p-button-sm"
          onClick={() => navigate(`/surveys/${rowData.id}`)}
          tooltip="View"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-button-sm"
          onClick={() => navigate(`/surveys/edit/${rowData.id}`)}
          tooltip="Edit"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete"
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`status-badge ${rowData.active ? 'active' : 'inactive'}`}>
        {rowData.active ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h2>Surveys</h2>
      <Button
        label="Create Survey"
        icon="pi pi-plus"
        onClick={() => navigate('/surveys/create')}
      />
    </div>
  );

  return (
    <div className="survey-list">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Card>
        <DataTable
          value={surveys}
          loading={loading}
          header={header}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage="No surveys found"
          responsiveLayout="scroll"
        >
          <Column field="id" header="ID" sortable style={{ width: '10%' }} />
          <Column field="title" header="Title" sortable style={{ width: '30%' }} />
          <Column field="description" header="Description" style={{ width: '30%' }} />
          <Column field="surveyType" header="Type" sortable style={{ width: '15%' }} />
          <Column body={statusBodyTemplate} header="Status" sortable style={{ width: '10%' }} />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%' }} />
        </DataTable>
      </Card>
    </div>
  );
}

export default SurveyList;
