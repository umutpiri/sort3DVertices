import numpy as np
import time

def getNearest(v1, v2, discard):
    v2 = v2.transpose()
    angle =  np.arccos(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))
    min = 100
    minindex = 0
    for i in range(0, len(angle)):
        if i not in discard and angle[i] < min:
            min = angle[i]
            minindex = i
    return minindex


if __name__ == '__main__':
    v1 = np.array([0, 5, 0])
    v2 = np.array([5, 0, 0])
    v3 = np.array([-5, 0, 0])
    v4 = np.array([0, -5, 0])
    v5 = np.array([3, 3, 0])
    vertices = np.array([v1, v2, v3, v4, v5])
    middle = vertices.mean(axis=0)
    centered_vertices = vertices - middle

    current = centered_vertices[0]
    selected_indices = list()
    selected_indices.append(0)
    for i in range(1, len(centered_vertices)):
        nearest = getNearest(current, centered_vertices, selected_indices)
        selected_indices.append(nearest)
        current = centered_vertices[nearest]

    print(selected_indices)
