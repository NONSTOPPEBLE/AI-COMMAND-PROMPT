const chatContainer = document.getElementById('chat-container');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
    
        const settingsButton = document.getElementById('settings-button');
        const settingsPanel = document.getElementById('settings-panel');
        const saveSettingsButton = document.getElementById('save-settings-button');
        const clearChatButton = document.getElementById('clear-chat-button');
        const apiKeyInput = document.getElementById('api-key');
        const modelEngineSelect = document.getElementById('model-engine');
        const maxTokensInput = document.getElementById('max-tokens');

        let apiKey = "";  // Use the hardcoded API key
        let modelEngine = localStorage.getItem('modelEngine') || "gpt-3.5-turbo"; //  model engine
        let maxTokens = localStorage.getItem('maxTokens') || 200;    // max tokens


        apiKeyInput.value = apiKey;
        modelEngineSelect.value = modelEngine;
        maxTokensInput.value = maxTokens;


        let isSettingsOpen = false;

        settingsButton.addEventListener('click', () => {
            isSettingsOpen = !isSettingsOpen;
            settingsPanel.classList.toggle('show', isSettingsOpen);
        });

        document.addEventListener('click', (event) => {
            if (isSettingsOpen && !settingsPanel.contains(event.target) && event.target !== settingsButton) {
                isSettingsOpen = false;
                settingsPanel.classList.remove('show');
            }
        });


        function sendMessage() {
            const messageText = messageInput.value.trim();

            if (messageText === '') return;

            // Display user message
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.textContent = messageText;
            chatContainer.appendChild(userMessage);

            messageInput.value = '';  // Clear input field

            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'system-message');
            typingIndicator.innerHTML = `<span class="typing-indicator"><span></span><span></span><span></span></span>`;
            chatContainer.appendChild(typingIndicator);

            // Send the message to the backend server to get OpenAI response
            getOpenAIResponse(messageText)
                .then(aiResponse => {
                    // Remove typing indicator
                    chatContainer.removeChild(typingIndicator);

                    // Display AI response
                    const aiMessage = document.createElement('div');
                    aiMessage.classList.add('message', 'system-message');
                    aiMessage.textContent = aiResponse;
                    chatContainer.appendChild(aiMessage);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                })
                .catch(error => {
                    console.error("Error fetching response:", error);

                    // Remove typing indicator on error
                    chatContainer.removeChild(typingIndicator);

                    // Display error message
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('message', 'system-message');
                    errorMessage.textContent = "Sorry, I couldn't process your request. Please try again later.";
                    chatContainer.appendChild(errorMessage);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                });
        }

        // Function to make a request to the OpenAI API
        async function getOpenAIResponse(userMessage) {
            const apiUrl = "https://api.openai.com/v1/chat/completions";

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,  // Use the API key here
                    },
                    body: JSON.stringify({
                        model: modelEngine,  // Use selected model
                        messages: [
                            { role: "user", content: userMessage }
                        ],
                        max_tokens: parseInt(maxTokens), // Use max tokens
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`OpenAI Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
                }

                const data = await response.json();
                const aiResponse = data.choices[0].message.content;
                return aiResponse;
            } catch (error) {
                console.error('Error in getOpenAIResponse:', error);
                throw error;
            }
        }

        // Send message on button click
        sendButton.addEventListener('click', sendMessage);

        // Send message on "Enter" key press
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        // Handle suggestion question clicks
        suggestionQuestions.forEach(question => {
            question.addEventListener('click', () => {
                messageInput.value = question.textContent;
                sendMessage();
            });
        });

        messageInput.addEventListener('click', () => {
            suggestionBox.style.opacity = 0;
            suggestionBox.style.visibility = 'hidden';
        });

        saveSettingsButton.addEventListener('click', () => {
            apiKey = apiKeyInput.value.trim();
            modelEngine = modelEngineSelect.value;
            maxTokens = maxTokensInput.value.trim();

            localStorage.setItem('apiKey', apiKey);
            localStorage.setItem('modelEngine', modelEngine);
            localStorage.setItem('maxTokens', maxTokens);

            isSettingsOpen = false;
            settingsPanel.classList.remove('show');
            alert('Settings saved successfully!');
        });

        clearChatButton.addEventListener('click', () => {
            chatContainer.innerHTML = '<div class="message system-message">Welcome! How can I assist you today?</div>';
        });




        // Edit message functionality
        chatContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('edit-button')) {
                const messageElement = target.closest('.message');
                if (messageElement && !messageElement.classList.contains('editing')) {
                    const messageContent = messageElement.textContent;
                    messageElement.classList.add('editing');

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.classList.add('edit-input');
                    input.value = messageContent;

                    const saveButton = document.createElement('button');
                    saveButton.classList.add('message-action-button', 'save-button');
                     saveButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`;

                    const cancelButton = document.createElement('button');
                    cancelButton.classList.add('message-action-button', 'cancel-button');
                    cancelButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;


                    const messageActions = messageElement.querySelector('.message-actions');
                    messageElement.appendChild(input);
                    messageActions.appendChild(saveButton);
                    messageActions.appendChild(cancelButton);


                    input.focus();

                    saveButton.addEventListener('click', () => {
                        messageElement.textContent = input.value;
                        messageElement.classList.remove('editing');
                        messageElement.removeChild(input);
                        messageActions.removeChild(saveButton);
                        messageActions.removeChild(cancelButton);
                         messageElement.textContent = input.value;
                    });

                    cancelButton.addEventListener('click', () => {
                        messageElement.classList.remove('editing');
                        messageElement.removeChild(input);
                        messageActions.removeChild(saveButton);
                        messageActions.removeChild(cancelButton);
                    });

                    input.addEventListener('keydown', (e) => {
                      if (e.key === 'Enter'){
                         messageElement.textContent = input.value;
                         messageElement.classList.remove('editing');
                         messageElement.removeChild(input);
                         messageActions.removeChild(saveButton);
                         messageActions.removeChild(cancelButton);
                      }
                      if (e.key === 'Escape'){
                        messageElement.classList.remove('editing');
                        messageElement.removeChild(input);
                        messageActions.removeChild(saveButton);
                        messageActions.removeChild(cancelButton);
                      }
                    })
                }
            }
            if (target.classList.contains('delete-button')) {
                const messageElement = target.closest('.message');
                if (messageElement) {
                    messageElement.remove();
                }
            }
        });

        // Add message actions (edit, delete) to each message
        chatContainer.addEventListener('DOMNodeInserted', (event) => {
            const node = event.target;
            if (node && node.classList && node.classList.contains('message')) {
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('message-actions');

                const editButton = document.createElement('button');
                editButton.classList.add('message-action-button', 'edit-button');
                editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5l-2-2L15 7.5 17 3z"/><path d="M15 5v2h2"/></svg>`;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('message-action-button', 'delete-button');
                deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;

                actionsDiv.appendChild(editButton);
                actionsDiv.appendChild(deleteButton);
                node.appendChild(actionsDiv);
            }
        });
