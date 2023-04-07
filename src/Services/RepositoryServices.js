import axios from 'axios';

export async function PingRepository(hostname) {
    const urlExtension = "/Ping";
    return axios.get(`${hostname}${urlExtension}`);
}

export async function GetRepositoryFilterMetadata(hostname, filters) {
    const urlExtension = "/resources/metadata/filters/";
    return axios.post(`${hostname}${urlExtension}`, filters);
}

export async function GetSingleFileMetadata(hostname, fileId){
    let urlExtension = `/resources/metadata/${fileId}`;
    if(hostname.includes("/resources")){
        urlExtension = `metadata/${fileId}`;
    }
    // const urlExtension = `/resources/metadata/${fileId}`;
    return axios.get(`${hostname}${urlExtension}`);
}

export async function getChildrenFromFile(hostname, fileId){
    const urlExtension = `metadata/${fileId}/children`;
    return axios.get(`${hostname}${urlExtension}`);
}

export async function GetFileImage(hostname, fileId){ //if the visualization is an image the reponseType needs to be blob
    const urlExtension = `${fileId}`;
    return axios.get(`${hostname}${urlExtension}`, {responseType: 'blob'});
}

export async function GetFileText(hostname, fileId){ //If the visualization is text-formatted the responsetype can't be blolb
    const urlExtension = `${fileId}`;
    return axios.get(`${hostname}${urlExtension}`);
}

export async function GetHistogramOfLog(hostname, fileId){
    const urlExtension = `histograms/${fileId}`;
    return axios.post(`${hostname}${urlExtension}`);
}

export async function GetRepositoryConfig(hostname) {
    const urlExtension = "/configurations";
    return axios.get(`${hostname}${urlExtension}`);
}

export async function GetResourceGraph(hostname, fileId){
    const urlExtension = `graphs/${fileId}`;
    return axios.get(`${hostname}${urlExtension}`);
}

export const sendFileToRepository = async (hostname, file, fileExtension, fileType, resourceLabel, description = "") => {
    // The file param is the html input type, not the metadata object used elsewhere.
    const urlExtension = "/resources/";
    // const fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('ResourceLabel', resourceLabel);
    formdata.append('ResourceType', fileType);
    formdata.append('FileExtension', fileExtension);
    formdata.append('Description', description);
    return axios.post(`${hostname}${urlExtension}`, formdata);
};

export const sendStreamToRepository = async (hostname, host, streamTopic, resourceLabel, resourceType = "EventStream", description = "") => {
    const urlExtension = "/resources/metadata";
    const formdata = new FormData();
    formdata.append('Host', host);
    formdata.append('StreamTopic', streamTopic);
    formdata.append('ResourceLabel', resourceLabel);
    formdata.append('ResourceType', resourceType);
    formdata.append('Description', description);
    return axios.post(`${hostname}${urlExtension}`, formdata);
}
