export const combinationService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // All fields for complete data display
      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "element1", "element2", "result"]
      };

      const response = await apperClient.fetchRecords('combination', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching combinations:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "element1", "element2", "result"]
      };

      const response = await apperClient.getRecordById('combination', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching combination with ID ${id}:`, error);
      return null;
    }
  },

  async create(combinationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: combinationData.Name || combinationData.name,
          Tags: combinationData.Tags || combinationData.tags || "",
          Owner: combinationData.Owner || combinationData.owner,
          element1: combinationData.element1,
          element2: combinationData.element2,
          result: combinationData.result
        }]
      };

      const response = await apperClient.createRecord('combination', params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating combination:", error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const params = {
        records: [{
          Id: id,
          Name: updateData.Name || updateData.name,
          Tags: updateData.Tags || updateData.tags || "",
          Owner: updateData.Owner || updateData.owner,
          element1: updateData.element1,
          element2: updateData.element2,
          result: updateData.result
        }]
      };

      const response = await apperClient.updateRecord('combination', params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating combination:", error);
      throw error;
    }
  },

  async delete(recordIds) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: Array.isArray(recordIds) ? recordIds : [recordIds]
      };

      const response = await apperClient.deleteRecord('combination', params);
      
      if (response && response.success) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting combinations:", error);
      throw error;
    }
  }
}