interface HttpInterface {
    statusCode: number, 
    body: any;
}



export const Ok = async (data: any): Promise<HttpInterface> => {

    return {
        statusCode: 200, 
        body: data
    }
};


export const Created = async (data?: any): Promise<HttpInterface> => {

    return {
        statusCode: 201, 
        body: data
    }
};

export const BadResquest = async (data?: any): Promise<HttpInterface> => {

    return {
        statusCode: 400, 
        body: data
    }
};

export const NotFound = async (): Promise<HttpInterface> => {

    return {
        statusCode: 404, 
        body: { 
            erro: "Not found"
        }
    }
};

export const noContent = async (): Promise<HttpInterface> => {

    return {
        statusCode: 204, 
        body: { 
            erro: "No content"
        }
    }
};