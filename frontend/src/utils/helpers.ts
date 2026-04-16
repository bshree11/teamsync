//Small resuable utility functions

//Formatting date
export const formatDate = (date: string): string=>{
    return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month:'short',
          day:'numeric',
    });
};

//Get Initials - gets first letters of name (for avatar)

export const getInitials = (name: string): string =>{
    return name
     .split(' ')
     .map((word)=> word[0])
     .join('')
     .toUpperCase()
     .slice(0,2)
};

//GET PRIORITY COLOR - returns color based on priority (high priority - red)

export const getPriority = (priority: string): string =>{
    switch(priority){
        case 'high':
            return 'text-red-500';
        case 'medium':
            return 'text-yellow-500';
        case 'low':
            return 'text-green-500';  
        default:
            return 'text-gray-500';          
    }
};

//GET STATUS COLOR - returns color based on status

export const getStatusColor = (status: string): string =>{
    switch (status){
        case 'todo':
            return 'bg-gray-100 text-gray-800';
        case 'in-progress':
            return 'bg-blue-100 text-blue-800';
        case 'done':
            return 'bg-green-100 text-green-100'; 
        default:
             return 'bg-gray-100 text-gray-800';           
    }
};

//shorten long text with ...

export const truncateText = (text: string, maxLength: number): string=>{
    if(text.length <= maxLength){
        return text;
    }
    return text.slice(0, maxLength) + '...';
};

