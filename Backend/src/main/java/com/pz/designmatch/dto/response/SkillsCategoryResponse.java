package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public final class SkillsCategoryResponse {

    @JsonProperty("name")
    private final String name;

    @JsonProperty("skills")
    private final List<String> skills;

    public SkillsCategoryResponse(String name, List<String> skills) {
        this.name = name;
        this.skills = skills;
    }
}
