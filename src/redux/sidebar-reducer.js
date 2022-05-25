let initialState = {
    friends: [
        { id: 2, name: "Andrey", "image": "https://lemanagement.se/wp-content/uploads/2017/12/1485175881mlkcl9q.jpg" },
        { id: 3, name: "Sveta", "image": "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
        { id: 4, name: "Sasha", "image": "https://wallbox.ru/resize/1024x1024/wallpapers/main2/201710/148923624258c3f1127d0107.83973406.jpg" },
    ],
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;