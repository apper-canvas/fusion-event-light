export const playerProgressService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // All fields for complete data display
      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "discovered_elements", "total_discoveries", "hints_used", "play_time", "achievements"]
      };

      const response = await apperClient.fetchRecords('player_progress', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching player progress:", error);
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
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "discovered_elements", "total_discoveries", "hints_used", "play_time", "achievements"]
      };

      const response = await apperClient.getRecordById('player_progress', id, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching player progress with ID ${id}:`, error);
      return null;
    }
  },

  async create(progressData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: progressData.Name || progressData.name,
          Tags: progressData.Tags || progressData.tags || "",
          Owner: progressData.Owner || progressData.owner,
          discovered_elements: progressData.discovered_elements || progressData.discoveredElements || "",
          total_discoveries: progressData.total_discoveries || progressData.totalDiscoveries || 0,
          hints_used: progressData.hints_used || progressData.hintsUsed || 0,
          play_time: progressData.play_time || progressData.playTime || 0,
          achievements: progressData.achievements || ""
        }]
      };

      const response = await apperClient.createRecord('player_progress', params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating player progress:", error);
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
          discovered_elements: updateData.discovered_elements || updateData.discoveredElements || "",
          total_discoveries: updateData.total_discoveries || updateData.totalDiscoveries || 0,
          hints_used: updateData.hints_used || updateData.hintsUsed || 0,
          play_time: updateData.play_time || updateData.playTime || 0,
          achievements: updateData.achievements || ""
        }]
      };

      const response = await apperClient.updateRecord('player_progress', params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating player progress:", error);
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

      const response = await apperClient.deleteRecord('player_progress', params);
      
      if (response && response.success) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting player progress:", error);
      throw error;
    }
  }
}