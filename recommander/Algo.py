import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.cluster.hierarchy import linkage, fcluster, dendrogram
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import SpectralClustering
from sklearn.cluster import KMeans

def create_matches(data_matrix, party_size: int):
    """

    :param df: ranking for given user (first column of user x user similarity matrix)
    :param party_size:
    :return:
    """
    # max value of similarity can be 1, we weight it down to 0.7
    weight_similarity = 0.2
    weight_mood = 0.4
    weight_sbl = 0.8
    weight_stress = 0.6

    pool_size = data_matrix.shape[0]

    data_matrix["ranking"] = data_matrix["ranking"] * weight_similarity
    data_matrix["mood"] *= weight_mood
    data_matrix["battery"] *= weight_sbl
    data_matrix["stress"] *= weight_stress

    numeric_columns = data_matrix.select_dtypes(include=[int, float]).columns
    data_matrix['row_sum'] = data_matrix[numeric_columns].sum(axis=1)
    # mean = df['row_sum'].mean()
    # df['row_sum'] -= mean

    # users_below_zero = df[df['row_sum'] < 0]['user'].tolist()
    # users_above_or_equal_zero = df[df['row_sum'] >= 0]['user'].tolist()
    # matches = []
    all = data_matrix['id'].tolist()

    matches = []
    while len(all) >= party_size + 2:
        match = []
        for _ in range(party_size // 2):
            user = all.pop(0)
            match.append(user)

            user = all.pop(len(all)-1)
            match.append(user)
        matches.append(match)


    if all:
        matches.append(all)
    print(matches)
    for match in matches:
        # match_id: int = get_match_id()
        print("match:", match)
        for user in match:
            # upload (match_id, user)
            pass


data2 = pd.read_csv('output.csv')
data = data2.iloc[:, 8:17]




# Step 2: Calculate cosine similarity for each pair of test subjects

similarity_matrix = cosine_similarity(data)
ranking = data2
ranking["ranking"] = similarity_matrix[0, :]
ranking = ranking[["id", "ranking", "mood", "battery", "stress"]]
create_matches(ranking, 4)

"""
# Step 3: Define a similarity threshold and filter out similar subjects
similarity_threshold = 0.6  # Adjust this threshold as needed
similar_subjects = []

for i in range(data.shape[0]):
    for j in range(i + 1, data.shape[0]):
        if similarity_matrix[i, j] >= similarity_threshold:
            similar_subjects.append((i, j))
            

df = pd.DataFrame(similarity_matrix)  
df.to_csv('/Users/lisa/Desktop/simMatrix.csv', index=False)
num_clusters = 10  # Create 10 groups

# Step 3: Create a K-Means clustering model
kmeans_model = KMeans(n_clusters=num_clusters, random_state=42)

# Step 4: Perform clustering using the similarity matrix
labels = kmeans_model.fit_predict(similarity_matrix)

# Create a DataFrame to store cluster assignments
cluster_data = pd.DataFrame({'Cluster': labels, 'Person': range(len(labels))})

# Group individuals by cluster
grouped = cluster_data.groupby('Cluster')['Person'].apply(list).reset_index(name='Members')

# Print the table showing clusters and their members
print(grouped)


distance_threshold = 0.9  # Adjust this threshold as needed

# Convert the similarity matrix into a distance matrix
distance_matrix = 1 - similarity_matrix

# Perform hierarchical clustering
linkage_matrix = linkage(distance_matrix, method='single')  # You can choose a different linkage method

# Assign individuals to clusters based on the distance threshold
labels = fcluster(linkage_matrix, t=distance_threshold, criterion='distance')

# Create a DataFrame to store the groups and their members
group_data = pd.DataFrame({'Group': labels, 'Person': range(len(labels))})

# Print the number of clusters
num_clusters = group_data['Group'].nunique()
print(f"Number of Clusters: {num_clusters}")

# Print the clusters and their members
grouped = group_data.groupby('Group')['Person'].apply(list)

# Print the table showing group numbers and members
table = pd.DataFrame({'Group Number': grouped.index, 'Members': grouped.values})
print(table)

# Plot the dendrogram for visualization
dendrogram(linkage_matrix)
plt.show()

"""





    



